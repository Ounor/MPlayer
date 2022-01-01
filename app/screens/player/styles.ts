import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  audioControllers: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 15,
  },
  audioCount: {
    fontSize: 14,
    textAlign: "right",
  },
  audioCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  audioTitle: {
    height: 40,
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  audioSubTitle: {
    color: "#ADAAAA",
    fontSize: 16,
    marginBottom: 24,
  },
  container: {
    flex: 1,
    zIndex: -100,
  },
  controlRound: {
    alignItems: "center",
    backgroundColor: "#0A345F",
    borderRadius: 24,
    height: 46,
    justifyContent: "center",
    marginHorizontal: 10,
    width: 46,
  },
  controlWhite: {
    marginHorizontal: 10,
  },
  midBannerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  progressFromTo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  slider: {
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  track: { borderRadius: 2, width: "100%", height: 8 },
  selected: { backgroundColor: "#fff", borderRadius: 2 },
  interface: { bottom: 100, position: "absolute", alignItems: "center", width: "100%" },
  imgBgStyle: {
    paddingTop: 14,
    paddingLeft: 10,
    bottom: 4,
    width: 108,
    height: 108,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
    marginRight: 4,
  },
})

export default styles
