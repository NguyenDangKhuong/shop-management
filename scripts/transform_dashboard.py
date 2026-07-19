import json

def convert_entities_to_grid_tiles(card):
    # If not an entities card, return as is
    if card.get("type") != "entities":
        return card
    
    entities = card.get("entities", [])
    title = card.get("title", "")
    
    # Check if there are any custom row types like paper-buttons-row
    for ent in entities:
        if isinstance(ent, dict) and "type" in ent:
            # Custom rows, do not convert
            return card
            
    # Convert standard entities to tile cards
    tile_cards = []
    for ent in entities:
        if isinstance(ent, str):
            tile_cards.append({
                "type": "tile",
                "entity": ent
            })
        elif isinstance(ent, dict):
            tile = {
                "type": "tile",
                "entity": ent.get("entity")
            }
            if "name" in ent:
                tile["name"] = ent["name"]
            if "icon" in ent:
                tile["icon"] = ent["icon"]
            tile_cards.append(tile)
            
    # If no tile cards converted (empty list), return as is
    if not tile_cards:
        return card
        
    # Return a grid card containing the tiles
    grid_card = {
        "type": "grid",
        "columns": 2,
        "square": False,
        "cards": tile_cards
    }
    if title:
        grid_card["title"] = title
        
    return grid_card

def main():
    input_path = "/Users/khuongn/Downloads/shop-management/dashboard_nha.json"
    output_path = "/Users/khuongn/Downloads/shop-management/dashboard_nha_new.json"
    
    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    views = data.get("data", {}).get("config", {}).get("views", [])
    
    # Process only the first view (default_view / "Nhà")
    if views:
        default_view = views[0]
        cards = default_view.get("cards", [])
        new_cards = []
        for card in cards:
            new_cards.append(convert_entities_to_grid_tiles(card))
        default_view["cards"] = new_cards
        
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print("Transformation completed successfully!")

if __name__ == "__main__":
    main()
