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

const EmptyState = () => (
  <div className="text-center py-10">
    <Trophy className="w-12 h-12 mx-auto text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No Leagues Found</h3>
    <p className="text-gray-500">
      There are no public leagues available at the moment.
      <br />
      Why not create one?
    </p>
    <Button
      className="mt-4"
      onClick={() => window.location.href = '/create-league'}
    >
      Create a League
    </Button>
  </div>
);

const FindLeagues = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedLeague, setSelectedLeague] = useState<any>(null);

  // Fetch leagues with corrected join syntax
  const { data: leagues, isLoading } = useQuery({
    queryKey: ["public-leagues", sortBy, sortOrder, search],
    queryFn: async () => {
      let query = supabase
        .from("leagues")
        .select(`
          *,
          tournament:tournaments(name, start_date, end_date),
          owner:auth.users!inner(
            profile:profiles!inner(username)
          ),
          _count:league_members(count)
        `)
        .eq("is_public", true);

      // Apply search filter if present
      if (search) {
        query = query.ilike("name", `%${search}%`);
      }

      // Apply ordering based on selected field
      if (sortBy === "tournament.start_date") {
        // For related table fields, we'll sort after fetching
        query = query.order("created_at", { ascending: sortOrder === "asc" });
      } else {
        query = query.order(sortBy, { ascending: sortOrder === "asc" });
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Filter out leagues whose tournaments have already started
      let filteredData = data.filter(league => {
        const tournamentStartDate = new Date(league.tournament?.start_date);
        return tournamentStartDate > new Date();
      });

      // Sort by tournament start date if selected
      if (sortBy === "tournament.start_date") {
        filteredData.sort((a, b) => {
          const dateA = new Date(a.tournament?.start_date || 0).getTime();
          const dateB = new Date(b.tournament?.start_date || 0).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
      }

      // Transform the data to match the expected format
      return filteredData.map(league => ({
        ...league,
        owner: {
          username: league.owner.profile.username
        }
      }));
    },
  });

  const { data: leagueMembers, isLoading: loadingMembers } = useQuery({
    queryKey: ["league-members", selectedLeague?.id],
    queryFn: async () => {
      if (!selectedLeague) return null;
      const { data, error } = await supabase
        .from("league_members")
        .select(`
          profiles:profiles(
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
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("Not authenticated");

      // Check if tournament hasn't started
      const { data: league } = await supabase
        .from("leagues")
        .select("tournament:tournaments(start_date)")
        .eq("id", leagueId)
        .single();

      if (!league) throw new Error("League not found");
      
      const tournamentStartDate = new Date(league.tournament.start_date);
      if (tournamentStartDate <= new Date()) {
        throw new Error("Cannot join league after tournament has started");
      }

      const { error } = await supabase
        .from("league_members")
        .insert({ 
          league_id: leagueId,
          user_id: user.user.id 
        });
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
              <SelectItem value="tournament.start_date">Tournament Start</SelectItem>
              <SelectItem value="created_at">Date Created</SelectItem>
              <SelectItem value="name">Name</SelectItem>
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
          {isLoading ? (
            <div className="p-8 text-center">Loading leagues...</div>
          ) : !leagues?.length ? (
            <EmptyState />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>League Name</TableHead>
                  <TableHead>Tournament</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leagues.map((league: any) => (
                  <TableRow key={league.id}>
                    <TableCell className="font-medium">{league.name}</TableCell>
                    <TableCell>{league.tournament?.name}</TableCell>
                    <TableCell>
                      {new Date(league.tournament?.start_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{league.owner?.username}</TableCell>
                    <TableCell>
                      {league._count?.[0]?.count ?? 0} / {league.max_players}
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
                            (league._count?.[0]?.count ?? 0) >= league.max_players ||
                            joinLeagueMutation.isPending
                          }
                        >
                          Join
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
                      key={member.profiles.username}
                      className="flex items-center gap-3 p-2 rounded-lg bg-gray-50"
                    >
                      {member.profiles.avatar_url ? (
                        <img
                          src={member.profiles.avatar_url}
                          alt={member.profiles.username}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                          {member.profiles.username[0].toUpperCase()}
                        </div>
                      )}
                      <span>{member.profiles.username}</span>
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
