import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";

const BIG_BANG_DATA = [
  {
    displayName: "Sheldon Cooper",
    job: "Theoretical Physicist",
    photoURL:
      "https://static.wikia.nocookie.net/the-big-bang-theory/images/0/04/Sheldon_05.jpg/revision/latest?cb=20130619214106&path-prefix=fr",
    age: 34,
    id: 4,
  },
  {
    displayName: "Leonard Hofstadter",
    job: "Experimental Physicist",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/en/7/77/Leonard_Hofstadter.jpg",
    age: 36,
    id: 5,
  },
  {
    displayName: "Howard Wolowitz",
    job: "Aerospace Engineer",
    photoURL:
      "http://img.over-blog-kiwi.com/1/21/25/91/20150405/ob_c38a7f_43b1d6e87417aa6287602dd9e0cb6f4a.jpg",
    age: 38,
    id: 6,
  },
  {
    displayName: "Rajesh Koothrappali",
    job: "Astrophysicist",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/en/a/a1/Rajesh_Koothrappali.jpg",
    age: 35,
    id: 7,
  },
  {
    displayName: "Penny",
    job: "Actress",
    photoURL: "https://fr.web.img6.acsta.net/newsv7/19/04/03/11/29/3339381.jpg",
    age: 30,
    id: 8,
  },
  {
    displayName: "Amy Farrah Fowler",
    job: "Neurobiologist",
    photoURL:
      "https://exthebigbangtheory.files.wordpress.com/2015/03/amy_farrah_fowler.jpg",
    age: 32,
    id: 9,
  },
  {
    displayName: "Bernadette Rostenkowski",
    job: "Microbiologist",
    photoURL:
      "https://static.wikia.nocookie.net/the-big-bang-theory/images/d/d5/Bernadette.jpg/revision/latest?cb=20130620092156&path-prefix=fr",
    age: 33,
    id: 10,
  },
];

const HomeScreen = () => {
  const { user, logout } = useAuth();

  const navigation = useNavigation();

  const swipeRef = useRef();

  const match = () => {
    navigation.navigate("Match");
  };

  return (
    <SafeAreaView style={tw.style("flex-1 mt-6")}>
      <View style={tw.style("flex-row items-center justify-between px-5")}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw.style("h-10 w-10 rounded-full")}
            source={{
              uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            style={tw.style("h-14 w-14")}
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      <View style={tw.style("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          cards={BIG_BANG_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(index) => console.log(index)}
          onSwipedRight={match}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  textAlign: "left",
                  color: "green",
                },
              },
            },
          }}
          renderCard={(card) => {
            return card ? (
              <View
                key={card.id}
                style={tw.style("bg-white h-3/4 rounded-xl relative")}
              >
                <Image
                  style={tw.style("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={tw.style(
                    "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
                  )}
                >
                  <View>
                    <Text style={tw.style("text-xl font-bold")}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw.style("text-xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={tw.style(
                  "relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl"
                )}
              >
                <Text style={tw.style("font-bold pb-5")}>No more profiles</Text>
                <Image
                  style={tw.style("h-20 w-20")}
                  source={{
                    uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={tw.style("flex flex-row justify-evenly")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw.style(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw.style(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
