import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
    onPress: () => void;
    placeholder: string;
}

const SearchBar = ({ onPress, placeholder }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 h-12 text-white">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        value=""
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        className="text-white text-sm ml-2 flex-1"
      />
    </View>
  );
};

export default SearchBar;
