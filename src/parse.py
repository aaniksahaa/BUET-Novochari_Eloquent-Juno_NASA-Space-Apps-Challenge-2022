import json

f = open('sample.json','r')
j = json.loads(f.read())
f.close()

x = []
for l in j:
  if 'map-projected' in l:
    x.append(l)

f = open('images.json','w')
f.write('[')
for i in range(len(x)):
  if i != len(x) - 1:
    f.write(str(x[i]) + ',')
  else:
    f.write(str(x[i]))
f.write(']')
f.close()