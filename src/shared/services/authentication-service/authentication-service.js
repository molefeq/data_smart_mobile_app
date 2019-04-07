import { AsyncStorage } from 'react-native';

class authenticationService {
  static isAuthenticated() {
    const user = this.getUserDetails().then((data) => {
      return data;
    });
    
    return Boolean(user) && Boolean(user.token);
  };

  static authenticate = async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  static getUserDetails = async () => {
    const user = await AsyncStorage.getItem('user');

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  };

  static getToken = async () => {
    const user = await this.getUserDetails();

    if (!user) {
      return null;
    }

    return user.token;
  };

  static getUsername = async () => {
    const user = await this.getUserDetails();

    if (!user) {
      return null;
    }

    return user.username;
  };

  static getUserId = async () => {
    const user = await this.getUserDetails();

    if (!user) {
      return null;
    }

    return user.id;
  };

  static signOut = async () => {
    await AsyncStorage.clear();
  };

}

export default authenticationService;
