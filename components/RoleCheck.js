
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import roleValues from './admin/data/roles.json';
import Page404 from './Page404';

export default function RoleCheck(props) {
    const { roles } = useContext(UserContext);
    const {role} = props;
    // const allow = roles & roleValues[role.toUpperCase()].bit;

    const checkRole = (rolesToCheck) => {
        const arrayOfRoles = rolesToCheck.split(',');
        arrayOfRoles.push("MASTER");
        let hasRole = false;

        arrayOfRoles.forEach(role => {
            if (roleValues[role].bit & roles) {
              console.log('Role: ', role);
              hasRole = true;
            }
        });
        return hasRole;
    }

    if (!checkRole(role)) {
      return (<Page404 />);
    }
    return props.children;
}