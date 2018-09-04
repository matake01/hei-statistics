SELECT
COL1.konto as 'Chalmers tekniska högskola'
,IFNULL(GROUP_CONCAT(COL2.tkr),'') as '1998'
,IFNULL(GROUP_CONCAT(COL3.tkr),'') as '1999'
,IFNULL(GROUP_CONCAT(COL4.tkr),'') as '2000'
,IFNULL(GROUP_CONCAT(COL5.tkr),'') as '2001'
,IFNULL(GROUP_CONCAT(COL6.tkr),'') as '2002'
FROM takbeloppsuppfoljning as COL1
LEFT JOIN takbeloppsuppfoljning as COL2 ON COL1.id = COL2.id AND COL2.ar='1998'
LEFT JOIN takbeloppsuppfoljning as COL3 ON COL1.id = COL3.id AND COL3.ar='1999'
LEFT JOIN takbeloppsuppfoljning as COL4 ON COL1.id = COL4.id AND COL4.ar='2000'
LEFT JOIN takbeloppsuppfoljning as COL5 ON COL1.id = COL5.id AND COL5.ar='2001'
LEFT JOIN takbeloppsuppfoljning as COL6 ON COL1.id = COL6.id AND COL6.ar='2002'
WHERE 1
AND COL1.larosate = 'Chalmers tekniska höskola'
AND COL1.ar IN ( '1998', '1999', '2000', '2001', '2002' )
GROUP BY 1
ORDER BY 1 ASC;