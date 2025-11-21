/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Adicione apenas os hosts que realmente precisa durante desenvolvimento.
      // Use o FQDN exato visto no log do erro.
      allowedOrigins: [
        "studious-barnacle-jpp76gp9pj7fqwgj-3000.app.github.dev",
        "localhost:3000", // opcional: inclua se fizer requests diretamente de localhost
      ],
      // Opcional: aumentar limite de tamanho do body para actions (ex.: '2mb')
      // bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
