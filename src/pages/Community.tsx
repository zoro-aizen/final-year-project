import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    content:
      'Just completed the Frontend Development roadmap! The React section was particularly helpful. Anyone else working on this path?',
    likes: 24,
    comments: 8,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    author: {
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    },
    content:
      'Looking for study buddies for the Machine Learning roadmap. Currently working on neural networks!',
    likes: 15,
    comments: 12,
    timestamp: '4 hours ago',
  },
  // Add more mock posts as needed
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState('');
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some content for your post.',
        variant: 'destructive',
      });
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
    };

    setPosts([post, ...posts]);
    setNewPost('');
    toast({
      title: 'Success',
      description: 'Your post has been created!',
    });
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community</h1>
        <p className="text-muted-foreground">
          Connect with fellow learners, share your progress, and get help from the
          community.
        </p>
      </div>

      <Card className="p-4 mb-6">
        <div className="flex items-start space-x-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <Input
              placeholder="Share your thoughts or ask a question..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleCreatePost}>Post</Button>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="flex items-start space-x-4">
              <img
                src={post.author.avatar}
                alt={`${post.author.name}'s avatar`}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {post.timestamp}
                  </span>
                </div>
                <p className="mt-2 text-foreground">{post.content}</p>
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>{post.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;
