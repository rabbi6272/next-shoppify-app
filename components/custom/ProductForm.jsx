import {
  Input,
  Select,
  Option,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useAddProduct } from "./addProductForm";

export default function ProductForm() {
  const {
    formData,
    pending,
    handleInputChange,
    handleFileChange,
    handleSelectChange,
  } = useAddProduct();

  return (
    <div className="max-w-screen-sm mx-auto p-6 space-y-6">
      <Typography variant="h4" color="blue-gray">
        Add New Product
      </Typography>

      <div className="space-y-4">
        <Input
          type="text"
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <Input
          type="number"
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />

        <Select
          label="Category"
          value={formData.category}
          onChange={handleSelectChange}
          required
        >
          <Option value="electronics">Electronics</Option>
          <Option value="clothing">Clothing</Option>
          <Option value="books">Books</Option>
          <Option value="accessories">Accessories</Option>
        </Select>

        <Input
          type="text"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <Input
          type="file"
          label="Product Image"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>

      <Button type="submit" className="mt-6" disabled={pending} fullWidth>
        {pending ? "Creating Product..." : "Create Product"}
      </Button>
    </div>
  );
}
