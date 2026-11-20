I will upload several photos, all of them have 6 cards. The cards are blue and square, and each card contains graph on 4x4 vertices and with 2 or 3 edges.
For every card, the 16 nodes have coordinates (0:0) (top left) to (3:3) (bottom right), with the first digit corresponding to the row number, the second to the column number. I want you to do the following:

    - for every card, parse the edges into the format start;end (the edges are undirected so by convention, the node which is smaller wrt to lex ordering will be the starting one)
    - For every card, output a line: "cardnumber, edge1, ...., edge n" where cardnumber is card00, card01 etc ascending and the edges are formatted as above
    if the card has 3 edges, adapt the name to special_card00 etc

