import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Search, Users, Trophy, CalendarDays } from "lucide-react";

const FindLeagues = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedLeague, setSelectedLeague] = useState<any>(null);

  // Fetch leagues
  const { data: leagues, isLoading } = useQuery({
    queryKey: ["public-leagues", sortBy, sortOrder, search],
    queryFn: async () => {
      let query = supabase
        .from("leagues")
        .select(`
          *,
          tournament:tournaments(name),
          owner:profiles!leagues_owner_id_fkey(username),
          _count:league_members(count)
        `)
        .eq("is_public", true)
        .order(sortBy, { ascending: sortOrder === "asc" });

      if (search) {
        query = query.ilike("name", `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Fetch league members when a league is selected
  const { data: leagueMembers, isLoading: loadingMembers } = useQuery({
    queryKey: ["league-members", selectedLeague?.id],
    queryFn: async () => {
      if (!selectedLeague) return null;
      const { data, error } = await supabase
        .from("league_members")
        .select(`
          user:profiles!league_members_user_id_fkey(
            username,
            avatar_url
          )
        `)
        .eq("league_id", selectedLeague.id);
      if (error) throw error;
      return data;
    },
    enabled: !!selectedLeague,
  });

  // Join league mutation
  const joinLeagueMutation = useMutation({
    mutationFn: async (leagueId: string) => {
      const { error } = await supabase
        .from("league_members")
        .insert({ league_id: leagueId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["public-leagues"] });
      queryClient.invalidateQueries({ queryKey: ["league-members"] });
      toast({
        title: "Success!",
        description: "You have joined the league.",
      });
      setSelectedLeague(null);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-16">
        <h1 className="text-4xl font-khand text-primary mb-8">Find Leagues</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search leagues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at">Date Created</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="tournament_id">Tournament</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>League Name</TableHead>
                <TableHead>Tournament</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading leagues...
                  </TableCell>
                </TableRow>
              ) : leagues?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No leagues found
                  </TableCell>
                </TableRow>
              ) : (
                leagues?.map((league) => (
                  <TableRow key={league.id}>
                    <TableCell className="font-medium">{league.name}</TableCell>
                    <TableCell>{league.tournament?.name}</TableCell>
                    <TableCell>{league.owner?.username}</TableCell>
                    <TableCell>
                      {league._count?.count} / {league.max_players}
                    </TableCell>
                    <TableCell>
                      {new Date(league.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLeague(league)}
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => joinLeagueMutation.mutate(league.id)}
                          disabled={
                            league._count?.count >= league.max_players ||
                            joinLeagueMutation.isPending
                          }
                        >
                          Join
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={!!selectedLeague} onOpenChange={() => setSelectedLeague(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-khand text-2xl flex items-center gap-2">
                <Trophy className="h-6 w-6 text-secondary" />
                {selectedLeague?.name} Members
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {loadingMembers ? (
                <p>Loading members...</p>
              ) : (
                <div className="space-y-4">
                  {leagueMembers?.map((member: any) => (
                    <div
                      key={member.user.username}
                      className="flex items-center gap-3 p-2 rounded-lg bg-gray-50"
                    >
                      {member.user.avatar_url ? (
                        <img
                          src={member.user.avatar_url}
                          alt={member.user.username}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                          {member.user.username[0].toUpperCase()}
                        </div>
                      )}
                      <span>{member.user.username}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default FindLeagues;