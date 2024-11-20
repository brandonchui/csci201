import React, { useState } from 'react';
import DashboardLayout from '~/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Select, SelectItem } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState('Settings');
  const [userName, setUserName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [workoutGoal, setWorkoutGoal] = useState('Gain Muscle');
  const [dailyCalories, setDailyCalories] = useState('2500');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [age, setAge] = useState('25');
  const [workoutDuration, setWorkoutDuration] = useState('60');

  const handleSignOut = () => {
    // Add sign out functionality here
    console.log('User signed out');
  };

  return (
    <DashboardLayout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View and edit your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Name</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <Button variant="outline" className="mt-4" onClick={() => console.log('Account details updated')}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Workout Goals Section */}
        <Card>
          <CardHeader>
            <CardTitle>Workout Goals</CardTitle>
            <CardDescription>Update your fitness goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workoutGoal">Workout Goal</Label>
              <select
                id="workoutGoal"
                value={workoutGoal}
                onChange={(e) => setWorkoutGoal(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="Gain Muscle">Gain Muscle</option>
                <option value="Lose Weight">Lose Weight</option>
                <option value="Maintain">Maintain</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dailyCalories">Daily Calorie Goal</Label>
              <Input
                id="dailyCalories"
                type="number"
                value={dailyCalories}
                onChange={(e) => setDailyCalories(e.target.value)}
                placeholder="Enter your daily calorie goal"
              />
            </div>
            <Button variant="outline" className="mt-4" onClick={() => console.log('Workout goals updated')}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Privacy and Security Section */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy and Security</CardTitle>
            <CardDescription>Manage your privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <Input
                id="password"
                type="password"
                value=""
                onChange={(e) => console.log('Password updated')}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twoFactorAuth" className="mr-4">Two-Factor Authentication</Label>
              <input
                type="checkbox"
                id="twoFactorAuth"
                checked={twoFactorAuth}
                onChange={(e) => setTwoFactorAuth(e.target.checked)}
                className="mr-4"
              />
              <span>{twoFactorAuth ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataSharing" className="mr-4">Data Sharing</Label>
              <input
                type="checkbox"
                id="dataSharing"
                checked={dataSharing}
                onChange={(e) => setDataSharing(e.target.checked)}
                className="mr-4"
              />
              <span>{dataSharing ? 'Enabled' : 'Disabled'}</span>
            </div>
            <Button variant="outline" className="mt-4" onClick={() => console.log('Privacy settings updated')}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* User Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your physical details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter your weight in pounds"
            />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
            <div className="flex space-x-2">
              <Input
                id="heightFeet"
                type="number"
                value={Math.floor(height / 12)}
                onChange={(e) => setHeight(e.target.value * 12 + (height % 12))}
                placeholder="Feet"
                className="w-1/2"
              />
              <Input
                id="heightInches"
                type="number"
                value={height % 12}
                onChange={(e) => setHeight(Math.floor(height / 12) * 12 + parseInt(e.target.value))}
                placeholder="Inches"
                className="w-1/2"
              />
            </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workoutDuration">Workout Duration (minutes per day)</Label>
              <Input
                id="workoutDuration"
                type="number"
                value={workoutDuration}
                onChange={(e) => setWorkoutDuration(e.target.value)}
                placeholder="Enter daily workout duration"
              />
            </div>
            <Button variant="outline" className="mt-4" onClick={() => console.log('Personal information updated')}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Sign Out Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sign Out</CardTitle>
            <CardDescription>Sign out of your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleSignOut} className="flex items-center">
              <LogOut className="mr-2 h-5 w-5" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer Spacing Fix */}
      <div className="h-12"></div> {/* Adds space above footer */}
    </DashboardLayout>
  );
}
