import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ){}

  getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  getPostById(id: number): Promise<Post | null> {
    return this.postsRepository.findOneBy({ id });
  }

  createPost(createPostDto: CreatePostDto){
    return this.postsRepository.save(createPostDto);
  }

  updatePost(id: number, UpdatePostDto: UpdatePostDto){
    return this.postsRepository.update(id, UpdatePostDto);
  }

  async deletePost(id: number): Promise<{ message: string }> {
    await this.postsRepository.delete(id);
    return { message: "delete post" }
  }

}
