const dinosaurs = [
  {
    name: "Aardonyx",
    description: "An early stage in the evolution of sauropods.",
  },
  {
    name: "Abelisaurus",
    description: '"Abel\'s lizard" has been reconstructed from a single skull.',
  },
];

export const resolvers = {
  Query: {
    dinosaurs: () => dinosaurs,
    dinosaur: (argument: any, args: any) => {
      console.log(argument)
      console.log(args)
      return dinosaurs.find((dinosaur) => dinosaur.name === args.name);
    },
  },
};

