import { View, Text, ImageBackground, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../database/firebase";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const [type, setType] = useState("login");

  const { loading, setLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
  }, [type]);

  const signin = () => {
    if (email.trim() === "" || password.trim() === "") {
      return Alert.alert("Error", "Please fill all the fields");
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          Alert.alert("Error", "Invalid Credentials");
        } else {
          Alert.alert("Error", error.message);
        }
      });
  };

  const signup = () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return Alert.alert("Error", "Please fill all the fields");
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: name });
        setLoading(false);
        setType("login");
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error", error.message);
      });
  };

  if (loading) {
    return (
      <View style={tw.style("flex-1 justify-center items-center")}>
        <Text style={tw.style("font-semibold text-red-400 text-2xl")}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      style={tw.style("flex-1")}
      resizeMode="cover"
      source={require("../assets/bg.png")}
    >
      {type === "login" ? (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign In</Text>
          <Text style={tw.style("text-white")}>Access to your account</Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4"
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
              onPress={signin}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType("signup")}>
              <Text style={tw.style("text-center text-gray-100 pt-3")}>
                Doen't have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4"
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
              onPress={signup}
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
