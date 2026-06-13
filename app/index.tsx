import { colorByTypes } from "@/utils/colorsByTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface basePoke {
  name: string;
  url: string;
}

interface detailedPokemon {
  name: string;
  frontShinyImgURL: string;
  backShinyImgURL: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export default function Index() {
  const [pokemonData, setPokemonData] = useState<detailedPokemon[]>([]);
  // console.log(JSON.stringify(pokemonData[0]));
  useEffect(() => {
    getPokeData();
  }, []);

  const getPokeData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");

      const fetchedPokemon = await Promise.all(
        response.data.results.map(async (item: basePoke) => {
          const { data } = await axios.get(item.url);
          // console.log(item.infoURL);
          return {
            name: data.forms[0].name,
            backShinyImgURL: data.sprites.back_shiny ?? "",
            frontShinyImgURL: data.sprites.front_shiny ?? "",
            types: data.types,
          };
        }),
      );

      setPokemonData(fetchedPokemon);
      // console.log(fetchedPokemon);
    } catch (error) {
      console.log("Error fetching Pokémon:", error);
    }
  };

  if (pokemonData.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading Pokémon...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemonData.map((poke) => (
        <View
          key={poke.name}
          style={{
            padding: 15,
            // borderBottomWidth: 1,
            // borderBottomColor: "white",
            borderRadius: 12,
            backgroundColor: colorByTypes[poke.types[0].type.name] + 60,
          }}
        >
          <Text style={styles.name}>{poke.name}</Text>
          <Text style={styles.type}>{poke.types[0].type.name}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: poke.frontShinyImgURL }}
              style={{ width: 120, height: 120 }}
            />
            <Image
              source={{ uri: poke.backShinyImgURL }}
              style={{ width: 120, height: 120 }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  name: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  type: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
  },
});
