---
layout: post
title: Working with Git
tags: [git]
date: 2016-07-27 13:50:00 +800
---

> Git is a free and open source distributed version control system with branching staging, areas and data assurance.

<!--more-->

## Cloning

Cloning is how you get a copy of a codebase to your local PC.

```bash
$ git clone <<git-url>> [local-repo-name]
```

## Branching

Branching allows you to work on an isolated copy of the code.

```bash
$ git checkout <<-b>> <<branch-name>>
```

`-b` for creating a new branch.   
Without `-b` will switch the current branch to `branch-name`.

## Committing

Committing adds changes to the repository's history.

```bash
$ git add <<file/path/to/add>>
$ git commit -m "Commit Message Explaining What Changed"
```

Before committing, you should `add` the changed files or path you want to commit.

## Pulling

Pulling allows you to bring in code changes from a branch on a remote.

```bash
$ git pull <<remote-name>> <<brach-name>>
```

`git-pull` will fetch and integrate with another repository or a local branch.

## Pushing

Pushing allows you to put committed code changes on to a branch on a remote.

```bash
$ git push <<-u>> <<remote-name>> <<branch-name>>
```

`-u` to set the upstream tracking branch.

## Remotes

Remotes are other repositories (usually other copies of the one being worked on, or forks).

```bash
$ git remote add <<remote-name>> <<git-url>>
```

## Workflow

1. Get a github account. [Github](https://github.com/), or your enterprise site.
2. At your local PC, generate a SSH key:

```bash
$ ssh-keygen [key-name/default rsa]
```

After running `ssh-keygen` command, you'll get two files, one is private key and the other is the publick key. You need to copy the `.pub` file content (public key) to your github repository in your profile -> settings -> SSH and GPG Keys page, create a new SSH key and paste your public key here.

After above steps, you can work with your github repository with git command line.


3. Create a repository.

4. Copy the repository to local PC.

Clone a repository through `Clone with SSH`, 

```bash
$ git clone <<git@github.com:account-name/repo-name.git>>
```


5. Create or Modify files at your local repo.
6. Add changes files.

```bash
$ git add <<file/path>>
```

7. Commit added files.

```bash
$ git commit -m "Comments to the changes files"
```

8. Push to origin master.

```bash
$ git push origin <<master/branch-name>>
```

9. If your repository is forked from another repository, after above steps, you need to create a `new Pull Request` from your forked repository to the remote master.

After this, the remote master will recieve a merge request from you, the owner will take actions to your request after reviewing.


## References

[Git Branching Remote Branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)   
[git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)
