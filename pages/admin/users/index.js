//Give Users Permissions/Roles
/*
0 - Banned (can no longer comment, submit art, etc. equivalent to a non-user)
1 - Basic User (can comment, Fav, stuff)
2 - Artist (Submit art) 
4 - News Author (Submit News Articles)
8 - Moderator (Ensures content is appropriate whatever that means, can suspend basic users) 
16 - Event Coordinator (Adds, Updates, Deletes Events)
32 - Community Manager (manage Authors, Artists, and Coordinators, ability to "hide" content.)
64 - Admin Assistant (Does not manage roles, but can suspend above)
128 - Admin (Manages Roles, and can do all the above)
*/

export default function AdminManagerUsers() {
    return (
      <div>
          AdminManagerUsers
      </div>
    )
  }
  