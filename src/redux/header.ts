import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { KEY_USER_TOKEN } from '../utility/constants';
import { retrieveItem } from '../utility/customAsyncStorage';

export async function header(headers: any) {
    headers.set("Accept", 'application/json',);
    // headers.set("Content-Type", "application/json");
    headers.set("AppVersion", await DeviceInfo.getVersion());
    headers.set('Platform', 'MOBILE',);
    headers.set('OsVersion', await DeviceInfo.getSystemVersion());
    headers.set("Os", Platform.OS);

    const token = await retrieveItem(KEY_USER_TOKEN)

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
}