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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Profile Information</h2>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium mb-1"
                >
                  Bio
                </label>
                <Input
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Name
                </h3>
                <p className="mt-1">{user?.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Email
                </h3>
                <p className="mt-1">{user?.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Bio
                </h3>
                <p className="mt-1">{user?.bio || 'No bio added yet.'}</p>
              </div>
            </div>
          )}
        </Card>

        {/* Statistics */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Your Progress</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Completed Roadmaps
              </h3>
              <p className="text-2xl font-bold mt-1">
                {mockStats.completedRoadmaps}
              </p>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                In Progress
              </h3>
              <p className="text-2xl font-bold mt-1">
                {mockStats.inProgressRoadmaps}
              </p>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Hours
              </h3>
              <p className="text-2xl font-bold mt-1">
                {mockStats.totalHoursLearned}
              </p>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Day Streak
              </h3>
              <p className="text-2xl font-bold mt-1">
                {mockStats.streakDays}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
