import { Alert, Linking } from "react-native";

export async function openEmail(email: string) {
  const emailUrl = `mailto:${email}`;

  try {
    const supported = await Linking.canOpenURL(emailUrl);

    if (!supported) {
      Alert.alert("Unable to open email app");
      return;
    }
    await Linking.openURL(emailUrl);
  } catch {
    Alert.alert("Something went wrong while opening email");
  }
}

export async function openPhone(phone: string) {
  const sanitizedPhone = phone.replace(/\s+/g, "");
  const phoneUrl = `tel:${sanitizedPhone}`;

  try {
    const supported = await Linking.canOpenURL(phoneUrl);

    if (!supported) {
      Alert.alert("Unable to open phone app");
      return;
    }
    await Linking.openURL(phoneUrl);
  } catch {
    Alert.alert("Something went wrong while opening phone");
  }
}
