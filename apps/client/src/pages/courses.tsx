import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "sonner";
import { cartState, saveCartToLocalStorage } from "store";
import { useRecoilState } from "recoil";
import { useCart } from "../hooks/useCart";
import type { Course } from "shared-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

type CourseProps = {
  course: Course;
  userRole: string;
  userId: string | null;
  createdCourses?: Course[];
  purchasedCourses?: Course[];
  onDelete?: () => void;
  onEdit?: () => void;
  onBuy?: () => void;
  onview?: () => void;
};

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  const getData = async () => {
    const response = await axios.get("/api/auth/courses", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    const data = response.data;
    setCourses(data);
  };

  useEffect(() => {
    getData();
  }, [router]);

  if (!courses.length) {
    <div>Loading Courses ...</div>;
  }

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {/* {courses.map((course: Course) => {
        return <Course key={course._id} course={course} />;
      })} */}
    </div>
  );
}

export function Course({
  course,
  userRole,
  onDelete,
  onBuy,
  onEdit,
  userId,
  createdCourses,
  purchasedCourses,
}: CourseProps) {
  const router = useRouter();
  // const [isInCart, setIsInCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useRecoilState(cartState);
  const { startDebouncedSync } = useCart();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };
  const isInCart = Object.values(cart).some((item) => item._id === course._id);

  const handleAddToCart = async () => {
    setLoading(true);

    let isItemRemoved = false;

    setCart((prevCart) => {
      const cartArray = Object.values(prevCart);
      const itemIndex = cartArray.findIndex((item) => item._id === course._id);
      const updatedCart: Record<string, Course> = {};

      if (itemIndex !== -1) {
        cartArray.splice(itemIndex, 1);
        isItemRemoved = true;
      } else {
        cartArray.push(course);
      }
      cartArray.forEach((item, index) => {
        updatedCart[String(index)] = item;
      });

      startDebouncedSync();
      console.log("updated cart on state", updatedCart);

      return updatedCart;
    });
    // setIsInCart(!isItemRemoved);
    toast.success(
      isItemRemoved ? "Item removed from cart" : "Item added to cart"
    );

    setLoading(false);
  };

  if (createdCourses) {
    var isCretedByAdmin = createdCourses.some((c) => c._id === course._id);
  }
  if (purchasedCourses) {
    var isPurchasedByUser = purchasedCourses.some((c) => c._id === course._id);
  }

  const renderButtons = () => {
    const commonButtonStyle = {
      borderRadius: 20,
      padding: "6px 16px",
      fontSize: "0.875rem",
      textTransform: "none",
    };
  
    if (userRole === "admin") {
      // Admin panel
      if (isCretedByAdmin) {
        return (
          <>
            <IconButton
              color="error"
              onClick={onDelete}
              sx={{ marginRight: 2 }}
            >
              <DeleteIcon />
            </IconButton>
            <Button
              variant="outlined"
              size="small"
              sx={commonButtonStyle}
              onClick={() => router.push("/admin/" + course._id)}
            >
              Edit
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button
              variant="outlined"
              size="small"
              sx={commonButtonStyle}
              onClick={() => {
                // onView()
              }}
            >
              View
            </Button>
          </>
        );
      }
    } else if (userRole === "user") {
      // User panel
      if (isPurchasedByUser) {
        return (
          <>
            <Button
              variant="outlined"
              size="small"
              sx={commonButtonStyle}
              onClick={() => {
                // router.push("/user/view/" + courseId);
              }}
            >
              View Purchased
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button
              variant="outlined"
              size="small"
              sx={commonButtonStyle}
              onClick={() => {
                // router.push("/user/view/" + courseId);
              }}
            >
              View
            </Button>
            <IconButton
              onClick={handleAddToCart}
              color={isInCart ? "error" : "default"}
              disabled={loading}
              sx={{ marginLeft: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : <ShoppingCartIcon />}
            </IconButton>
          </>
        );
      }
    }
  };

  return (
    <Card
      sx={{
        margin: 2,
        width: 300,
        height: 400, 
        padding: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.03)",
        },
      }}
    >
      <Typography variant="h6" textAlign="center" sx={{ fontWeight: "bold" }}>
        {course.title}
      </Typography>
      <Typography
        sx={{
          textAlign: "left",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "none" : 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: 2, 
          fontSize: "0.875rem",
          color: "text.secondary",
        }}
        variant="body2"
      >
        {course.description}
      </Typography>


      <Button
        variant="text"
        onClick={handleToggle}
        sx={{
          padding: 0,
          textTransform: "none",
          alignSelf: "flex-start",
          fontSize: "0.875rem",
          marginBottom: 2, 
        }}
      >
        {expanded ? (
          <KeyboardArrowUp sx={{ fontSize: "1.25rem" }} />
        ) : (
          <KeyboardArrowDown sx={{ fontSize: "1.25rem" }} />
        )}
      </Button>

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={course.imageLink}
          alt={course.title}
          style={{
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            marginBottom: '20px'
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "20px'", 
        }}
      >
        {renderButtons()}
      </div>
    </Card>
  );
}
