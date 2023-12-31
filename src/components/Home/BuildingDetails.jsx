import { motion } from "framer-motion"

const BuildingOverview = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2 className="text-2xl font-semibold text-gray-800"
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{delay: 1.7, duration: 1.7}}
          >Building Overview</motion.h2>
          <motion.p className="mt-2 text-gray-600 font-semibold"
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{delay: 2.1, duration: 2.1}}
          >
          Welcome to our architectural masterpiece, strategically located to grace the heart of Bangladesh. This exquisitely designed building stands as a testament to luxury and comfort, offering a harmonious blend of modern elegance and timeless design as you step into our space.

          </motion.p>
        </div>

        <div>
          <motion.p className="text-gray-600"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 2.1, duration: 2.1}}
          >
            Our commitment to providing a unique living experience is reflected in every corner. From meticulously crafted interiors to state-of-the-art facilities, we have curated an environment that resonates with sophistication and tranquility.
          </motion.p>

          <motion.p className="mt-4 text-gray-600"
                                              initial={{opacity: 0}}
                                              animate={{opacity: 1}}
                                              transition={{delay: 2.1, duration: 2.1}}
          >
            The architectural brilliance seamlessly integrates with the surrounding beauty, creating a haven that transcends the ordinary.
          </motion.p>

          <motion.p className="mt-4 text-gray-600"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 2.1, duration: 2.1}}
          >
            Join us on a journey where every detail is an expression of our dedication to quality living. Discover a residence that not only meets but exceeds your expectations, offering a lifestyle that is truly unparalleled.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default BuildingOverview;
