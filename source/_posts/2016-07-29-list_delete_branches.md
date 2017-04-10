---
layout: post
title: How to list and delete branches
tags: git branch list delete
date: 2016-07-29 16:06 +800
---

> Git list different demanded branches and delete branches both local and remote.

<!--more-->

## List branches

```bash
# list your local branches
$ git branch

# list your remote branches
$ git branch -r

# list both remote and local branches
$ git branch -a
```

## See the last commit on each Branch

```bash
$ git branch -v
```

### List merged or not merged branches

```bash
# list the branches that are already merged into the branch you're on
$ git branch --merged

# list the branches that contain work you haven't yet merged in
$ git branch --no-merged
```

## Delete branches

```
# delete a local branch
$ git branch -d <<local_branch_name>>

# delete a remote branch
$ git push origin :<<remote_branch_name>>
```

If you have other branches that contain work that haven't merged in yet, trying to delete it with `git branch -d` will fail.   
But if you really do want to delete the branch and lose that work, you can force it with -D.

```bash
# force to delete an unmerged branch
$ git branch -D <<local_branch_name>>
```

## Reference

[Git Branching - Branch Management](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)   

