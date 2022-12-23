
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import roleValues from './admin/data/roles.json';
import Page404 from './Page404';

export default function RoleCheck(props) {
    const { roles } = useContext(UserContext);
    const {role} = props;
    const allow = roles & roleValues[role.toUpperCase()].bit;

    if (!allow) {
      return (<Page404 />);
    }
    return props.children;
}