import { useState } from "react";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import { Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Instructions = () => {
  const [activeTab, setActiveTab] = useState("points");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-5xl font-khand text-primary mb-4"
              variants={itemVariants}
            >
              How to Play
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              variants={itemVariants}
            >
              Master the art of fantasy drafts and climb your way to glory!
            </motion.p>
          </div>

          <Tabs defaultValue="points" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger 
                value="points" 
                className="text-lg font-khand"
                onClick={() => setActiveTab("points")}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Points System
              </TabsTrigger>
              <TabsTrigger 
                value="draft" 
                className="text-lg font-khand"
                onClick={() => setActiveTab("draft")}
              >
                <Users className="w-5 h-5 mr-2" />
                Draft Rules
              </TabsTrigger>
            </TabsList>

            <TabsContent value="points">
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="font-khand text-3xl text-primary">Points System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-700">
                  <div className="prose max-w-none">
                    <p className="text-lg mb-6">
                      Dive into the excitement with our new point system that's as competitive as a World Cup final and as unpredictable as a penalty shootout. Whether you're cheering for group stage grinders or knockout champions, every match is a chance to rack up points. Advance with flair, pull off the unexpected, and battle your way to the top with style! May the best draft master win!
                    </p>
                    
                    <div className="bg-primary/5 p-6 rounded-lg mb-8">
                      <h3 className="text-2xl font-khand text-primary mb-4">🏆 Group Stage Glory</h3>
                      <ul className="list-none space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-primary font-bold">•</span>
                          Win a match? Nab yourself 3 points. It's like striking gold!
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary font-bold">•</span>
                          A Draw still rocks the boat with 1 point.
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary font-bold">•</span>
                          A Loss? We'll get them next time—zilch for now!
                        </li>
                      </ul>
                      <p className="mt-4">
                        Advance beyond the group stage, and your team snags a nifty bonus of 3 extra points!
                      </p>
                    </div>

                    <div className="bg-secondary/5 p-6 rounded-lg mb-8">
                      <h3 className="text-2xl font-khand text-primary mb-4">⚡ Knockout Stage Kings</h3>
                      <p className="mb-4">
                        The stakes skyrocket as we move into the heart-pounding knockout rounds. Keep your cool and guide your teams to victory with escalating points for each win:
                      </p>
                      <ul className="list-none space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="text-secondary font-bold">•</span>
                          Round of 32: 3 points – You're warming up!
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-secondary font-bold">•</span>
                          Round of 16: 5 points – Showtime!
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-secondary font-bold">•</span>
                          Quarterfinals: 7 points – Feeling the pressure yet?
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-secondary font-bold">•</span>
                          Semifinals: 10 points – One match away from eternal glory!
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-secondary font-bold">•</span>
                          Finals Win: 15 points – A spectacular finish worthy of legends!
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-secondary font-bold">•</span>
                          Third Place Match: 3 points – A sweet little cherry on top!
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg">
                      <h3 className="text-2xl font-khand text-primary mb-4">💥 Bonus Blitz</h3>
                      <p>
                        Win the entire tournament, and relish the satisfaction of an additional 5-point bonus! What a way to crown your strategic prowess!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="draft">
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="font-khand text-3xl text-primary">
                    🐍 The Snake Draft: A Strategic Spin on Selection!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-700">
                  <div className="prose max-w-none">
                    <p className="text-lg mb-6">
                      Welcome to the thrilling world of the snake draft—a dynamic, strategic draft that twists and turns just like our competitive spirit!
                    </p>

                    <div className="bg-primary/5 p-6 rounded-lg mb-8">
                      <h3 className="text-2xl font-khand text-primary mb-4">Draft Order</h3>
                      <ul className="list-none space-y-4">
                        <li className="flex items-center gap-2">
                          <span className="text-primary font-bold">1.</span>
                          Round 1: We take turns picking teams in a pre-determined order from 1 to N (where N is the number of participants). If you're the first in line this round, you get the first overall pick. Choose wisely—you're setting the tone!
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary font-bold">2.</span>
                          Round 2: The order reverses! The last person in the first round gets the first pick in the second round, zigzagging back to the start. This way, if you were first in Round 1, you'll be last to pick in Round 2. Fair game for all!
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary font-bold">3.</span>
                          Continue the Zigzag: We keep this pattern going, back and forth like a strategic dance until all participants have selected their allocated number of teams.
                        </li>
                      </ul>
                    </div>

                    <div className="bg-secondary/5 p-6 rounded-lg mb-8">
                      <h3 className="text-2xl font-khand text-primary mb-4">🎽 Assembling Your Dream Team</h3>
                      <ul className="list-none space-y-4">
                        <li className="flex items-center gap-2">
                          <span className="text-secondary font-bold">•</span>
                          Each participant drafts multiple teams (depending on how many are available and how many of you are playing). For instance, if there are 20 teams and 5 participants, each of you will draft and support 4 teams throughout the tournament.
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-secondary font-bold">•</span>
                          Note: If there are more teams than can be equally divided among players, some teams will not be drafted. Consider carefully which teams might be flying under the radar!
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-secondary font-bold">•</span>
                          Your goal? Maximize your squad's total points by picking teams you believe will dominate both the group stages and knockout rounds. Channel your inner coach, think tactically, and draft the future champions!
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg">
                      <h3 className="text-2xl font-khand text-primary mb-4">🔒 Locked Lineups - No Free Agency or Trades</h3>
                      <p className="mb-6">
                        Once the draft is completed, your roster is set in stone—no trading or dropping teams. This ensures everyone sticks to their draft-day decisions and strategizes within their unique roster throughout the tournament!
                      </p>
                      <h3 className="text-2xl font-khand text-primary mb-4">🔥 The Grand Strategy</h3>
                      <p>
                        The snake draft balances the field, where early picks favor the best-sounding options, but clever late-round steals can secure glory just as easily. It's about wits, foresight, and a pinch of luck!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Instructions;