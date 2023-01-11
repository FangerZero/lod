import RoleCheck from '../../components/RoleCheck';
import {asignTheme, getThemes, updateTheme} from '../../components/util/theme';
import { UserContext } from '../../lib/context';
import { useContext } from 'react';

export default function Profile() {
  const { user, theme} = useContext(UserContext);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const onThemeChange = (e) => {
    asignTheme(e.target.value);
    updateTheme(e.target.value, user);
  }

  const createThemeSelection = () => {
    return getThemes.map(themeName => <><input type="radio" key={themeName} id={themeName} name="theme" value={themeName} defaultChecked={themeName === theme} onChange={e => onThemeChange(e)}/>{capitalizeFirstLetter(themeName)}</>)
  }

  return (
    <RoleCheck role="BASIC">
      {createThemeSelection()}
    </RoleCheck>
  )
}
  