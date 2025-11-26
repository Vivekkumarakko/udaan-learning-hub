import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, BookOpen, GraduationCap, Activity } from "lucide-react";

interface UserProfile {
  user_id: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface StudentProfile {
  user_id: string;
  class_level: string;
  points: number;
  preferred_language: string;
}

interface TutorProfile {
  user_id: string;
  verified: boolean;
  subjects: string[];
  bio: string | null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);
  const [tutorProfiles, setTutorProfiles] = useState<TutorProfile[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    tutors: 0,
    parents: 0,
    admins: 0,
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      await loadAllData();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/");
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Load all profiles
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      // Load student profiles
      const { data: studentsData } = await supabase
        .from("student_profiles")
        .select("*");

      // Load tutor profiles
      const { data: tutorsData } = await supabase
        .from("tutor_profiles")
        .select("*");

      // Load user roles for stats
      const { data: rolesData } = await supabase
        .from("user_roles")
        .select("role");

      if (profilesData) setProfiles(profilesData);
      if (studentsData) setStudentProfiles(studentsData);
      if (tutorsData) setTutorProfiles(tutorsData);

      // Calculate stats
      const roleCounts = rolesData?.reduce((acc: any, { role }) => {
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalUsers: profilesData?.length || 0,
        students: roleCounts?.student || 0,
        tutors: roleCounts?.tutor || 0,
        parents: roleCounts?.parent || 0,
        admins: roleCounts?.admin || 0,
      });
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-destructive";
      case "tutor": return "bg-primary";
      case "student": return "bg-success";
      case "parent": return "bg-warning";
      default: return "bg-muted";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-card shadow-md sticky top-0 z-10 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="animate-bounce-in hover:shadow-colored transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="animate-bounce-in hover:shadow-colored transition-all duration-300" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-success" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{stats.students}</div>
            </CardContent>
          </Card>

          <Card className="animate-bounce-in hover:shadow-colored transition-all duration-300" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Tutors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.tutors}</div>
            </CardContent>
          </Card>

          <Card className="animate-bounce-in hover:shadow-colored transition-all duration-300" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-warning" />
                Parents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{stats.parents}</div>
            </CardContent>
          </Card>

          <Card className="animate-bounce-in hover:shadow-colored transition-all duration-300" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-destructive" />
                Admins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{stats.admins}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="tutors">Tutors</TabsTrigger>
          </TabsList>

          {/* All Users Tab */}
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  All User Profiles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.map((profile) => (
                        <TableRow key={profile.user_id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="font-medium">{profile.full_name}</TableCell>
                          <TableCell>
                            <Badge className={getRoleBadgeColor(profile.role)}>
                              {profile.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{profile.user_id.slice(0, 8)}...</TableCell>
                          <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-success" />
                  Student Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Class Level</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Language</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentProfiles.map((student) => {
                        const profile = profiles.find(p => p.user_id === student.user_id);
                        return (
                          <TableRow key={student.user_id} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">{profile?.full_name}</TableCell>
                            <TableCell>{student.class_level}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-success/10 text-success">
                                {student.points} pts
                              </Badge>
                            </TableCell>
                            <TableCell>{student.preferred_language}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tutors Tab */}
          <TabsContent value="tutors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Tutor Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead>Bio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tutorProfiles.map((tutor) => {
                        const profile = profiles.find(p => p.user_id === tutor.user_id);
                        return (
                          <TableRow key={tutor.user_id} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">{profile?.full_name}</TableCell>
                            <TableCell>
                              <Badge variant={tutor.verified ? "default" : "secondary"}>
                                {tutor.verified ? "✓ Verified" : "Pending"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {tutor.subjects?.map((subject, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {subject}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{tutor.bio || "N/A"}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security Notice */}
        <Card className="mt-8 border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="text-warning flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              🔒 Passwords are encrypted and cannot be displayed for security reasons. 
              User authentication is handled securely by the backend system. 
              All sensitive data is protected and compliant with security best practices.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
