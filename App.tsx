import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import githubApi from './src/services/api';

interface IUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id?: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  hireable: boolean;
  bio?: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string
}

export default function App() {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    githubApi.get<IUser>('https://api.github.com/users/wesferoli').then((response) => {
      setUser(response.data);
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>{ user?.login }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
