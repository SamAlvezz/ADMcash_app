import React from 'react'
import { FlatList, Text, View } from 'react-native'

export default function Labels({ data, styles }) {
  console.log(data);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.label}
      renderItem={({ item }) => (
        <View style={styles.flatListItem}>

          <View style={styles.flatListItemLabel}>
            <View
              style={[styles.colorSquare, { backgroundColor: item.color }]}
            />
            <Text
              style={[
                styles.DatatextValue,
                { fontSize: 16, marginLeft: 10 },
              ]}
            >
              {item.name}
            </Text>
          </View>
          <Text
            style={[
              styles.DatatextValue,
              { fontSize: 16 },
            ]}
          >
            {item.label}
          </Text>

        </View>
      )}
      style={{
        marginVertical: 7,
        marginHorizontal: 10,
        backgroundColor: "#fafffe",
        borderRadius: 10,
        elevation: 3,
        marginLeft: 7,
      }}
    />
  )
}