import { createContext } from 'react';
import { User } from 'firebase/auth';

export const UserContext = createContext({ user: User, username: null, roles: 0 });