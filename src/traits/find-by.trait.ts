export async function findByName(name: string) {
  return await this.repository.findOne({
    where: { name: name },
  })
}
