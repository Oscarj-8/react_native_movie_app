import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

interface TrendingCardProps {
  movie: {
    movie_id: number;
    title: string;
    poster_url: string;
  };
  index: number;
}

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie.movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5 mr-2" key={index}>
        <Image
          source={{ uri: movie.poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-6 -left-2.5  px-2 py-1 rounded-full text-white">
          <MaskedView
            maskElement={
              <Text className="text-6xl font-semibold text-white">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text className="text-sm font-bold mt-2  text-light-200" numberOfLines={1}>{movie.title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
