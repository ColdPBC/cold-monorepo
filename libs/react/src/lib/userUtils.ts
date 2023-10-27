import { User } from '@auth0/auth0-react';

export const getUserName = (user: User) => {
  if (user.given_name && user.family_name) {
    return `${user.given_name} ${user.family_name}`;
  } else {
    return user.name;
  }
};
