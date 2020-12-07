module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/entries',
        permanent: true
      }
    ]
  }
}