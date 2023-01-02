import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AddFanArt() {
  return (
    <RoleCheck role="ARTIST">
      <Link className={styles.link} href="/admin/fanart">Back To FanArt</Link>
      AddFanArt
      Every piece of art has ... <br />
      <ol>
        <li>Title</li>
        <li>Photo</li>
        <li>Summary</li>
        <li>uid</li>
        <li>Artist</li>
        <li>Date</li>
        <li>Like</li>
        <li>Dislike</li>
        <li>comments
          <ul>
            <li>Date</li>
            <li>User</li>
            <li>Comment</li>
            <li>Flag</li>
            <li>Like</li>
            <li>Dislike</li>
          </ul>
        </li>
        <li>Character Multi-select
          two boxes left is the selected, right is the list of characters to choose
          <ul>
            <li>Rose</li>
            <li>Dart</li>
            <li>Shana</li>
            <li>Kongol</li>
            <li>Meru</li>
            <li>Haschel</li>
            <li>Miranda</li>
            <li>Albert</li>
            <li>Zieg</li>
            <li>Lavitz</li>
          </ul>
        </li>
        <li>Location</li>
        Search as you Type textbox? 
      </ol>
    </RoleCheck>
  );
}
