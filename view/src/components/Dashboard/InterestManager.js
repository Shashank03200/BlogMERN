import {
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const categories = [
  "Technology",
  "Business",
  "Culture",
  "Poltitics",
  "Health",
  "Style",
  "Travel",
];

function InterestManager(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [availableCategories, setAvailableCategories] = useState(categories);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelectChange = (e) => {
    setSelectedIndex(e.target.value);
  };

  const handleDelete = (deleteIndex) => {
    const selectedArray = [...selectedCategories];
    const availableArray = [...availableCategories];
    availableArray.push(selectedArray[deleteIndex]);
    setAvailableCategories(availableArray);
    selectedArray.splice(deleteIndex, 1);
    setSelectedCategories(selectedArray);
  };

  const handleSelectAdd = () => {
    const selectedArray = [...selectedCategories];
    const availableArray = [...availableCategories];
    const newEntry = availableArray[selectedIndex];

    selectedArray.unshift(newEntry);
    setSelectedCategories(Array.from(new Set(selectedArray)));
    availableArray.splice(selectedIndex, 1);
    setAvailableCategories(availableArray);
    setSelectedIndex(0);
  };

  return (
    <Box
      sx={{
        padding: "4px",
        marginY: "60px",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "24px" }}>
        Select your interests
      </Typography>
      {availableCategories.length !== 0 && (
        <Box sx={{ display: "flex", marginY: "20px" }}>
          <Box flex="8">
            <Select
              sx={{ padding: "1px" }}
              variant="filled"
              fullWidth
              onChange={handleSelectChange}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              defaultValue={0}
            >
              {availableCategories.map((category, index) => {
                return (
                  <MenuItem key={index} value={index}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                height: "100%",
              }}
              onClick={handleSelectAdd}
            >
              Add
            </Button>
          </Box>
        </Box>
      )}
      <Box>
        <Stack direction="row" spacing={1} sx={{ display: "flex" }}>
          {selectedCategories.map((selectedItem, index) => {
            if (index % 2 === 0)
              return (
                <Chip
                  label={selectedItem}
                  color="success"
                  onDelete={() => handleDelete(index)}
                />
              );
            else
              return (
                <Chip
                  label={selectedItem}
                  color="primary"
                  onDelete={() => handleDelete(index)}
                />
              );
          })}
        </Stack>
        <Box textAlign="center" sx={{ marginTop: "30px" }}>
          <Button variant="contained" color="primary" sx={{ marginY: "12px" }}>
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default InterestManager;
