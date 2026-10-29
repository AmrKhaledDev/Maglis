import { UserSearchResult } from "@/types/UserSearchResult.type";
import Card from "./Card";
// ====================================================================
function UsersResult({ users }: { users: UserSearchResult[] }) {
  return (
    <div>
      <h2 className="mb-4 font-normal">الأشخاص</h2>
      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsersResult;
