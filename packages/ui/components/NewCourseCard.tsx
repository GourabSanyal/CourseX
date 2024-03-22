/* eslint-disable react/jsx-sort-props */
/* eslint-disable unicorn/filename-case */
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Typography,
  Card,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface FormValues {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
}

export function NewCourseCard(props: {
  onClick: (
    title: string,
    description: string,
    price: number,
    imageLink: string,
    // published: boolean
  ) => Promise<void>;
  onError: string | undefined;
}): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSubmitForm = async (data: FormValues) => {
    await props.onClick(
      data.title,
      data.description,
      data.price,
      data.imageLink,
    //   data.published
    );
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Upload a new course below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 20 }}>
          <TextField
            fullWidth
            label="Image"
            margin="normal"
            {...register("imageLink", { required: "Image URL is required" })}
            error={Boolean(errors.imageLink)}
            helperText={errors.imageLink?.message}
          />
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            {...register("title", { required: "Title is required" })}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            {...register("description", {
              required: "Description is required",
            })}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
          <TextField
            label="Price"
            margin="normal"
            fullWidth
            type="number"
            {...register("price", { required: "Price is required" })}
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* Image uploader */}
          <br />
          <br />
          <Button
            onClick={handleSubmit(handleSubmitForm)}
            size="large"
            variant="contained"
            type="submit"
          >
            Add Course
          </Button>
          {props.onError ? (
            <Typography
              align="center"
              style={{ marginTop: 10, color: "red" }}
              variant="body2"
            >
              {props.onError}
            </Typography>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
