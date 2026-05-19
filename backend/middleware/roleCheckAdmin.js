const isAdmin = (
   req,
   res,
   next
) => {

   try {
      const role = req.headers.role;

      if (role !== "ADMIN") {
         return res.status(403).json({
            success: false,
            message:
               "Only ADMIN can perform this action"
         });
      }
      next();

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

module.exports = isAdmin;