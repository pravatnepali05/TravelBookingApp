import cloudinary from "../config/Cloudinary.js";
import Post from "../models/Post.js"; 
import slug from "slugify";

export const createPostController = async (req, res) => {
  try {
    const {
      title,
      holidayDestination,
      description,
      category,
      image,
      isAvailable,
      guest,
      price,
      nearArea,
      facilities,
      slug: customSlug
    } = req.body;

    // Validate required fields 
    if (
      !title ||
      !holidayDestination ||
      !description ||
      !category ||
      !isAvailable ||
      !guest ||
      !price ||
      !nearArea ||
      !facilities
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    let imageUrls = [];

    //  Case 1: Image files uploaded (via form-data)
    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

      if (files.length !== 3) {
        return res.status(400).json({
          message: "Exactly three image files must be uploaded"
        });
      }

      imageUrls = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "posts"
          });
          return {
            url: result.secure_url,
            public_id: result.public_id
          };
        })
      );
    }

    // Case 2: Direct image URLs in body
    else if (Array.isArray(image) && image.length === 3) {
      imageUrls = image.map((url) => ({
        url,
        public_id: null
      }));
    } else {
      return res.status(400).json({
        message: "At least three image URLs or files are required"
      });
    }

    // Save post to database
    const newPost = new Post({
      title,
      holidaylocation,
      description,
      category,
      image: imageUrls,
      isAvailable,
      guest,
      price,
      nearArea,
      facilities,
      slug: customSlug || slugify(title, { lower: true })
    });

    await newPost.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

export const getPostController = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .select("-images") // Exclude public_id from the response
      .populate("category")
      return res.status(200).send({
      success: true
       , message: "Post fetched successfully",
      post      
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting post",
      error,
  });
}
};

export const getAllPostController = async (req, res) => {
  try {
    const posts = await Post.find({})
      /*.select("-images") // Exclude public_id from the response
      .populate("category")
      .sort({ createdAt: -1 }); // Sort by creation date, most recent first */

    return res.status(200).send({
      success: true,
      message: "All posts fetched successfully",
      posts
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all posts",
      error
    });
  }
}  

export const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      holidaylocation,
      description,
      category,
      image,
      isAvailable,
      guest,
      price,
      nearArea,
      facilities,
      slug: customSlug
    } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let uploadImage = post.image;

    const files = req.files?.images;
    if (files && files.length === 3) {
      // Delete old images
      await Promise.all(
        post.image.map(({ public_id }) => {
          if (public_id) return cloudinary.uploader.destroy(public_id);
        })
      );

      uploadImage = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.tempFilePath, { folder: "posts" });
          return { url: result.secure_url, public_id: result.public_id };
        })
      );
    } else if (files && files.length !== 3) {
      return res.status(400).json({ message: "Exactly three image files must be uploaded" });
    }

    const updatedData = {
      ...(title && { title }),
      ...(holidaylocation && { holidaylocation }),
      ...(description && { description }),
      ...(category && { category }),
      ...(uploadImage && { image: uploadImage }),
      ...(isAvailable !== undefined && { isAvailable }),
      ...(guest && { guest }),
      ...(price && { price }),
      ...(nearArea && { nearArea }),
      ...(facilities && { facilities }),
      ...(title && { slug: customSlug || slugify(title, { lower: true }) })
    };

    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, { new: true });

    return res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const deletePostController = async (req, res) => {
  try {
await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Post deleted successfully" });  
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
  
