# To-Do List

---


# Profiles Page
Tasks for the `/profile/` page

### **Fill in the Fitness Statistics**
- [ ] **Task**: Fill the fitness statistics card on the right and **remove BMI**, replace with something else
- **Priority**: Medium
- **Description**:
  Calculate average workout time based on the exercise table for the given user. Remove the BMI field and add something relevant.

### **Fill in the Personal Information**
- [ ] **Task**: Populate the personal info on the left card
- **Priority**: Medium
- **Description**:
  Convert inches from the table into feet and inches format and display appropriately.

### **Add a kilos option for the weight information**
- [ ] **Task**: Add a dropdown to toggle between lbs and kg and handle conversion
- **Priority**: Low
- **Description**:
  Design implementation is flexible.

### **Update the Active Member and Streak badges**
- [ ] **Task**: Update the badges in the topmost card
- **Priority**: Low
- **Description**:
  Active member means having a generated exercise within the last 3 days. The streak logic needs clarification.

### **Add an Achievements card for the profile page**
- [ ] **Task**: Add an achievements card below the fitness statistics card
- **Priority**: Low
- **Description**:
  Include milestones and display associated images from the `/public/` folder.

---

# Navigation Bar
Tasks for the top navigation bar (where it says CSCI201Project)

### **Navigation bar does not hide when scrolling down**
- [ ] **Task**: Hide the navigation bar when scrolling down, show when scrolling up
- **Priority**: Medium
- **Description**:
  Make the navigation bar dynamic to improve UX.

### **User icon bug**
- [ ] **Task**: Fix the user icon dropdown to show actual user info
- **Priority**: High
- **Description**:
  Populate name and email fields.

---

# Dashboard
Tasks for the `/dashboard/` page

### **Top row cards are not implemented, delete progress card**
- [ ] **Task**: Hook up the API to navigation cards
- **Priority**: Medium
- **Description**:
  Ensure streaks, weekly goal, and workout time reflect the user ID API data.

### **Add skeleton when clicking "Generate Plan"**
- [ ] **Task**: Display a loading skeleton during plan generation
- **Priority**: High
- **Description**:
  Prevent display of stale data during API calls.

---

# Statistics
Tasks for the `/statistics/` page

### **Remove or replace the bottom bar graph with "Weekly Exercise Progress"**
- [ ] **Task**: Replace or remove the bottom graph
- **Priority**: Medium
- **Description**:
  Progress is hard to measure accurately, replace it with more relevant data.

### **Hook up API and update the top row of statistics**
- [ ] **Task**: Update statistics cards with API data
- **Priority**: Medium
- **Description**:
  Replace irrelevant data (e.g., weight loss goals) with more meaningful statistics.

### **Replace weight progress graph with "Workouts Completed"**
- [ ] **Task**: Show workouts completed in the past week
- **Priority**: Medium
- **Description**:
  Replace the weight progress graph with a weekly workouts line graph.

---

# Workouts
Tasks for the `/workouts/` page

### **Add a remove exercise button for each workout card**
- [ ] **Task**: Add an "accept/reject" ui element for an exercise card
- **Priority**: High
- **Description**:
  generated exercises from the AI will be marked as ai generated in the backend, and allow user to accept or deny it. by default keep as our exercise, so accept will do nothing basically, but deny will send a delete request


### **Generate plan should add skeleton (see above)**
- [ ] **Task**: Add a loading skeleton during plan generation
- **Priority**: Medium
- **Description**:
  Improve feedback for data loading.

### **Add a way to complete a workout**
- [ ] **Task**: Design UI to allow marking workouts as complete
- **Priority**: Medium
- **Description**:
  Send a PUT request to update the exercise table.

---

# Schedule
Tasks for the `/schedule/` page

### **Add color for today's date**
- [ ] **Task**: Highlight today's date on the calendar
- **Priority**: Medium
- **Description**:
  Improve visibility of the current date in the UI.

---

# Settings
Tasks for the `/settings/` page

### **Allow users to edit their personal info**
- [ ] **Task**: Enable editing of user information
- **Priority**: Medium
- **Description**:
  Design a UI for updating user info via a PUT request.

### **Allow users to edit their fitness statistics**
- [ ] **Task**: Enable editing of fitness statistics
- **Priority**: Medium
- **Description**:
  Design a UI for updating fitness data via a PUT request.

### **Add a "Focus" UI element**
- [ ] **Task**: Add a focus option for users
- **Priority**: Low
- **Description**:
  Allow users to focus on specific fitness goals (e.g., full-body workouts).

---

# General Bugs

### **Exercise API is not hooked up to the calendar on all pages**
- [ ] **Task**: Update exercise elements based on the selected date
- **Priority**: Medium
- **Description**:
  Ensure exercises are displayed correctly when navigating the calendar.

### **Fix padding on the "Today" button in the mini calendar**
- [ ] **Task**: Adjust padding for visual consistency
- **Priority**: Low
- **Description**:
  Aesthetic improvement.

### **[DO NOT IMPLEMENT YET] Add a default user for guests**
- [ ] **Task**: Create a default guest user with limited functionality
- **Priority**: High
- **Description**:
  Disable most features except the plan generator.

### **[DO NOT IMPLEMENT YET] Add a logout function**
- [ ] **Task**: Reset the React state to log out
- **Priority**: High
- **Description**:
  Provide a way to terminate login sessions.
