##Instructions to Update Dataset

Update via git :

 `cncf_landscape1/src/data/landscape_data.yml`

####Testing Dataset:

`yaml2json -s -p landscape_data.yml`

If the YAML format is correct a new version of `landscape_data.json` will be generated.

In case the process fails, check the log for problems and fix before commiting to repository.

