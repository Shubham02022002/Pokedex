import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  frontImageURL: string;
  backImageURL: string;
}

export default function Index() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokeData();
  }, []);

  const getPokeData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");

      const fetchedPokemon = await Promise.all(
        response.data.results.map(async (item: any) => {
          const singleData = await axios.get(item.url);

          return {
            name: singleData.data.forms[0].name,
            backImageURL: singleData.data.sprites.back_default,
            frontImageURL: singleData.data.sprites.front_default,
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
    <ScrollView>
      {pokemonData.map((poke) => (
        <View
          key={poke.name}
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <Text>{poke.name}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: poke.frontImageURL }}
              height={100}
              width={100}
            />
            <Image
              source={{ uri: poke.backImageURL }}
              height={100}
              width={100}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    // flex: 1,
    flexDirection: "row",
  },
});