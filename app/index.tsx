import { basePoke, DetailedPokemon } from "@/types";
import { colorByTypes } from "@/utils/colorsByTypes";
import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [pokemonData, setPokemonData] = useState<DetailedPokemon[]>([]);
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
      <View style={loadingStyles.container}>
        <Text style={loadingStyles.text}>Catching Pokémon...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#10131A",
      }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    >
      {pokemonData.map((poke) => (
        <Link
          key={poke.name}
          href={{
            pathname: "/details",
            params: { name: poke.name },
          }}
          asChild
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor:
                  colorByTypes[poke.types[0].type.name] ?? "#777",
              },
            ]}
          >
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardName}>{poke.name.toUpperCase()}</Text>

                <View style={styles.badges}>
                  {poke.types.map((type) => (
                    <View key={type.type.name} style={styles.badge}>
                      <Text style={styles.badgeText}>{type.type.name}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <Image
                source={{ uri: poke.frontShinyImgURL }}
                style={styles.cardImage}
              />
            </View>
          </View>
        </Link>
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
  card: {
    borderRadius: 24,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardName: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
  },

  cardImage: {
    width: 120,
    height: 120,
  },

  badges: {
    marginTop: 10,
    gap: 8,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "white",
    fontWeight: "600",
  },
});

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#10131A",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
