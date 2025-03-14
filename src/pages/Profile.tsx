import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth';

interface UserStats {
  completedRoadmaps: number;
  inProgressRoadmaps: number;
  totalHoursLearned: number;
  streakDays: number;
}

const mockStats: UserStats = {
  completedRoadmaps: 2,
  inProgressRoadmaps: 3,
  totalHoursLearned: 156,
  streakDays: 12,
};

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  const handleSave = async () => {
    try {
      await updateUser(formData);
      setIsEditing(false);
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and view your progress
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg'}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="text-sm font-medium text-foreground"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            ) : (
              <p className="text-muted-foreground">{formData.bio}</p>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">
                  {mockStats.completedRoadmaps}
                </p>
                <p className="text-sm text-muted-foreground">
                  Completed Roadmaps
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockStats.inProgressRoadmaps}
                </p>
                <p className="text-sm text-muted-foreground">
                  In Progress Roadmaps
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockStats.totalHoursLearned}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Hours Learned
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.streakDays}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Active Roadmaps</h3>
            {/* Add roadmap progress cards here */}
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>
            {/* Add activity feed here */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
