import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    marginTop: height(5),
    alignItems: 'center',
  },
  deliveryDetailsContainer: {
    width: width(90),
    elevation: 2,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: width(5),
    paddingHorizontal: width(3),
    paddingVertical: height(2),
    marginBottom: height(2)
  },
  headingText: {
    fontSize: width(4),
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: width(3),
  },
  row: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height(1),
    justifyContent: 'space-between'
  },
  labelText: {
    marginLeft: width(4),
    fontSize: width(3.2),
    width: '30%',
  },
  valueText: {
    fontWeight: 'bold',
    marginLeft: width(10),
    fontSize: width(3.2),
    width: '70%'
  },
  buttonContainer: {
    marginTop: 0
  },
});
export default styles;
