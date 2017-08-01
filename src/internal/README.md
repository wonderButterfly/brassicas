# Internals

Here is where plans for the card game is laid out.

## Overall structure

Upon initialization, card objects are generated. 

## Store/state

State requires the following properties

| state prop | type  | description |
|--|--|--|
|board| `Board` | Game board, contains order of cards |
| [brassicas] | inherited classes from `Card` | Each card object with info on display and status |
| score | `number` | current score

The state object will need to be rendered using React

### Actions 

## Objects

### Board

### Cards

All cards inherit from an abstract class;

| properties | type| description |
|--|--|--|
| faceDownURL | `string` | path to image asset | 
| faceUpURL | `string` | path to image asset |
| isSelected | `boolean` | user selection |

| method | description |
|--|--|
| `select()` | creates new instance of selected cards with opposite `isSelected` value |


#### Joker card

| properties | type| description |
|--|--|--|
| behaviors | `Array<()=>{}>`, to be specified later | specifies callbacks to happen randomly if clicked |




#### Brassicas

| properties | type| description |
|--|--|--|
| brassica | `string` | name of brassica |


| method | description |
|--|--|
| `abstract compare(Brassica A, Brassica B): boolean` | returns whether the two specified arguments are of the same brassica type, i.e. `A.brassica === B.brassica` |