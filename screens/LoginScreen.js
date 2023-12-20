import { View, Text, ImageBackground, TextInput } from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = () => {
  const [type, setType] = useState("signup");
  return (
    <ImageBackground
      style={tw.style("flex-1")}
      resizeMode="cover"
      source={require("../assets/bg.png")}
    >
      {type === "login" ? (
        <View style={tw.style("flex-1 justify-center items-center")}></View>
      ) : (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign up</Text>
          <Text style={tw.style("text-white")}>Create a new account</Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Name</Text>
            <TextInput
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4"
              )}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4"
              )}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4"
              )}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType("login")}>
              <Text style={tw.style("text-center text-gray-100 pt-3")}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default LoginScreen;
