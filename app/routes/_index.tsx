import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sanityClient } from "~/sanity.server";
import Navigation from "~/components/Navigation";
import Hero from '~/components/Hero';

type Project = {
  _id: string; 
  title: string;
  description: string;
};

export const loader: LoaderFunction = async () => {
  try {
    const projects = await sanityClient.fetch<Project[]>(`
      *[_type == "project"] {
        _id,
        title,
        description
      }
    `);
    return json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return json({ projects: [], error: "Failed to load projects" });
  }
};

export default function Index() {
  const { projects, error } = useLoaderData<{ projects: Project[], error?: string }>();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>
        {error && <p className="text-red-500">{error}</p>}
        {projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}