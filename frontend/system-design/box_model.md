Box model has 4 layers

content box
Padding box
border box
margin box

box model has 2 properties

Box size
Box type

Box size has 2 types

Intrinsic : when we dont apply any rules like height or width the heignt and width of the box is determined by it's content

Restricted : when the box size is governed by sets of rules like the below
explicit width and height set via CSS
constrained by parent or other boxes through mechanism like
flex or grid
percentge of parent size
the aspect-ratio property of images
the presence of ohter children in the DOm tree


Box type

the types of boxes are
Inline level
Block level
Anonymous box

Block Level
 Block level elements takes 100% of the width of the parent container width
 The height of the content is equal to the intrinsic (content) size
 the element is rendered from top to bottom
 participate in Block Context Formatting (BCP)

Anonymous Box
 <div>
 <p>Content</p>
 </div>
 ->> This will be an anonymous box -<<

Mathematics of block level elements

box-sizing : content-box (default)
width = padding+border+content
div {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 10px solid black;
  margin: 30px;
  box-sizing: content-box;
}
The total width of the element will be:
200px (width) + 20px (padding left) + 20px (padding right) + 10px (border left) + 10px (border right) = 260px.

The total height will be:
100px (height) + 20px (padding top) + 20px (padding bottom) + 10px (border top) + 10px (border bottom) = 160px.


box-sizing : border-box
div {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 10px solid black;
  margin: 30px;
  box-sizing: border-box;
}
The total width will still be 200px (because padding and border are included inside the width).

The total height will still be 100px (because padding and border are included inside the height).


Inline elements
 They render as string flowing from left to right and from top to bottom
 They participate in an Inline formatting Context (IFC)
 They generate Inline level boxes

 Mathematics of Inline level elements
  Does not respond to the width and height properties, completely ignores them
  Does not respond to vertical margins, Ingnores them
  Inline padding does not alter the height of the inline elements



BROWSER FORMATTING CONTEXT